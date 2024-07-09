import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
       `${process.env.DB_CONNECTION}`
    );

    console.log(
      "mongo db connection succefull:",
      ConnectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB connection Failed: ", error);
  }
};

export default ConnectDB;
