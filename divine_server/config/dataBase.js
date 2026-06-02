const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", false); // Deprecation warning ഒഴിവാക്കാൻ

    // 💡 വാണിംഗ് തരുന്ന ആ രണ്ട് ഓപ്ഷനുകൾ ഇവിടെ നിന്നും ഒഴിവാക്കിയിട്ടുണ്ട്
    const connection = await mongoose.connect(process.env.DB_LOCAL_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // എറർ വന്നാൽ പ്രോസസ്സ് സ്റ്റോപ്പ് ചെയ്യാൻ
  }
};

module.exports = connectDatabase;
