const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🎯 1. കൺട്രോളറുകളിൽ സോക്കറ്റ് സുഖമായി കിട്ടാൻ വേണ്ടി ഇത് ഗ്ലോബൽ ആക്കുന്നു!
global.io = io;

const userSocketMap = {};
console.log("📡 User Socket Map:", userSocketMap);

const getReceiverSocketId = (receiverId) => {
  console.log("receiverId21 server", receiverId);
  return userSocketMap[receiverId]?.socketId || null;
};

io.on("connection", (socket) => {
  const userId =
    socket.handshake.auth?.userId || socket.handshake.query?.userId;
  console.log("🟢 User connected:", userId);
  console.log("🟢 socketId:", socket.id);

  if (userId) {
    if (
      userSocketMap[userId]?.socketId &&
      userSocketMap[userId].socketId !== socket.id
    ) {
      const oldSocketId = userSocketMap[userId].socketId;
      io.to(oldSocketId).disconnectSockets(true);
    }

    userSocketMap[userId] = {
      socketId: socket.id,
      name: "Unknown",
    };
  }

  socket.emit("me", socket.id);

  socket.on("join", (user) => {
    if (!user || !user.id) {
      console.warn("[⚠️] Invalid user data on join");
      return;
    }

    userSocketMap[user.id] = {
      socketId: socket.id,
      name: user.name,
    };

    console.log("✅ User joined:", user.name, "-", user.id);

    const onlineUsers = Object.entries(userSocketMap).map(
      ([userId, value]) => ({
        userId,
        name: value.name,
        socketId: value.socketId,
      }),
    );

    io.emit("getOnlineUsers", onlineUsers);
  });

  // =================================================================
  // 🔥🔥🔥 POLL ROOM LOGIC (ഫിക്സ് ചെയ്തത്) ✅
  // =================================================================

  // 1. ഫ്രണ്ട്എൻഡിൽ നിന്ന് ഒരു യൂസർ ഒരു പോളിന്റെ റൂമിലേക്ക് കയറുമ്പോൾ
  socket.on("joinPoll", (pollRoom) => {
    if (!pollRoom) return;

    // 💡 ഫ്രണ്ട്എൻഡ് ഇപ്പോൾ 'poll:id' ആയിട്ടാണ് വരുന്നത്, അതുകൊണ്ട് നേരിട്ട് ജോയിൻ ചെയ്യിക്കാം
    const roomName = pollRoom.startsWith("poll:")
      ? pollRoom
      : `poll:${pollRoom}`;
    socket.join(roomName);
    console.log(`👤 User [${socket.id}] joined poll room ➡️ ${roomName}`);
  });

  // 2. യൂസർ ആ പോൾ പേജിൽ നിന്ന് മാറുമ്പോൾ റൂം ലീവ് ചെയ്യും
  socket.on("leavePoll", (pollRoom) => {
    if (!pollRoom) return;

    const roomName = pollRoom.startsWith("poll:")
      ? pollRoom
      : `poll:${pollRoom}`;
    socket.leave(roomName);
    console.log(`🏃 User [${socket.id}] left poll room ➡️ ${roomName}`);
  });

  // 3. ഫ്രണ്ട്എൻഡിൽ നിന്ന് മെസ്സേജ് ടൈപ്പ് ചെയ്ത് ഇൻസ്റ്റന്റ് സോക്കറ്റ് എമിറ്റ് ചെയ്യുമ്പോൾ
  socket.on("newPollComment", (commentData) => {
    if (!commentData) return;

    // ഡാറ്റയ്ക്കുള്ളിലെ ഐഡി കൃത്യമായി ഫോർമാറ്റ് ചെയ്യുന്നു
    const rawId = commentData.pollId || commentData.poll;
    if (!rawId) return;

    const pollRoom = rawId.toString().startsWith("poll:")
      ? rawId.toString()
      : `poll:${rawId}`;

    socket.to(pollRoom).emit("newPollComment", commentData);
    console.log(`📢 Broadcasted new comment to room: ${pollRoom}`);
  });

  // =================================================================

  socket.on("disconnect", () => {
    for (const [userId, value] of Object.entries(userSocketMap)) {
      if (value.socketId === socket.id) {
        console.log("🔴 User disconnected:", userId);
        delete userSocketMap[userId];
        break;
      }
    }
    io.emit("contentRef", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
