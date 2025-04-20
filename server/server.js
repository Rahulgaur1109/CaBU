const express = require("express");
const mongoose = require("mongoose");
const Ride = require("./models/rideSchema");
const RequestToJoin = require("./models/requestToJoin");
const RideGroup = require("./models/rideGroupSchema");
const Message = require("./models/messageSchema");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // to allow frontend requests

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://nsvkm56:sw1qvD0594S8nYeE@cluster0.f1hmukh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST API to create a new ride
app.post("/api/rides", async (req, res) => {
  try {
    const rideData = req.body;

    const newRide = new Ride(rideData);
    await newRide.save();

    res
      .status(201)
      .json({ message: "Ride created successfully", ride: newRide });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(400).json({ error: error.message });
  }
});
// Strict matching search API - all provided fields must match exactly
// Exact match search API - matches every field precisely
app.post("/api/rides/match", async (req, res) => {
  try {
    const {
      fromLocation,
      toLocation,
      date,
      time,
      availableSeats,
      pricePerPerson,
      additionalNotes,
      userEmail,
    } = req.body;

    // Build query object for exact matching on all fields
    const query = {};

    // Add exact match parameters for each field
    if (fromLocation !== undefined) {
      query.fromLocation = fromLocation;
    }

    if (toLocation !== undefined) {
      query.toLocation = toLocation;
    }

    // For date, convert to proper date object but keep it as exact day match
    if (date !== undefined) {
      const searchDate = new Date(date);
      searchDate.setHours(0, 0, 0, 0); // Start of day
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.date = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    if (time !== undefined) {
      query.time = time;
    }

    if (availableSeats !== undefined) {
      query.availableSeats = availableSeats;
    }

    if (pricePerPerson !== undefined) {
      query.pricePerPerson = pricePerPerson;
    }

    if (additionalNotes !== undefined) {
      query.additionalNotes = additionalNotes;
    }

    if (userEmail !== undefined) {
      query.userEmail = userEmail;
    }

    // Find rides that match all provided criteria exactly
    const rides = await Ride.find(query).sort({ date: 1, time: 1 });

    // Return the matching rides
    res.status(200).json({
      message: "Matching rides found",
      count: rides.length,
      rides: rides,
    });
  } catch (error) {
    console.error("Error finding matching rides:", error);
    res.status(500).json({ error: "Failed to find matching rides" });
  }
});

// POST API to create a new request to join
app.post("/api/request-to-join", async (req, res) => {
  try {
    const {
      fromPickupLocation,
      toLocation,
      date,
      time,
      availableSeats,
      pricePerPerson,
      additionalNotes,
      ownerEmail,
      requestEmail,
    } = req.body;

    const newRequest = new RequestToJoin({
      fromPickupLocation,
      toLocation,
      date,
      time,
      availableSeats,
      pricePerPerson,
      additionalNotes,
      ownerEmail,
      requestEmail,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request to join created successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error creating request to join:", error);
    res.status(400).json({ error: error.message });
  }
});

// GET API to fetch all requests to join by email
// GET API to fetch all requests to join by ownerEmail
app.post("/api/request-to-join/by-owner", async (req, res) => {
  try {
    const { ownerEmail } = req.body;

    if (!ownerEmail) {
      return res.status(400).json({ error: "ownerEmail is required" });
    }

    const requests = await RequestToJoin.find({ ownerEmail });

    res.status(200).json({
      message: "Requests found",
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// app.post("/api/ride-group", async (req, res) => {
//   try {
//     const { groupId, ownerEmail, memberEmail } = req.body;

//     if (!groupId || !ownerEmail || !memberEmail) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newGroup = new RideGroup({
//       groupId,
//       ownerEmail,
//       membersEmail: [memberEmail],
//     });

//     await newGroup.save();

//     res.status(201).json({
//       message: "Ride group created successfully",
//       group: newGroup,
//     });
//   } catch (error) {
//     console.error("Error creating ride group:", error);
//     res.status(500).json({ error: "Failed to create ride group" });
//   }
// });

app.post("/api/ride-group", async (req, res) => {
  try {
    const { groupId, ownerEmail, memberEmail } = req.body;

    if (!groupId || !ownerEmail || !memberEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if a group already exists for this specific ride and owner
    const existingGroup = await RideGroup.findOne({
      groupId: groupId,
      ownerEmail: ownerEmail,
    });

    if (existingGroup) {
      // Check if the member already exists in the group
      if (existingGroup.membersEmail.includes(memberEmail)) {
        return res
          .status(400)
          .json({ error: "Member already exists in this ride group" });
      }

      // Add new member to the membersEmail array
      existingGroup.membersEmail.push(memberEmail);
      await existingGroup.save();

      return res.status(200).json({
        message: "Member added to existing ride group",
        group: existingGroup,
      });
    } else {
      // Create a new group if not found
      const newGroup = new RideGroup({
        groupId,
        ownerEmail,
        membersEmail: [memberEmail],
      });

      await newGroup.save();

      return res.status(201).json({
        message: "Ride group created successfully",
        group: newGroup,
      });
    }
  } catch (error) {
    console.error("Error handling ride group:", error);
    res.status(500).json({ error: "Failed to process ride group" });
  }
});

app.post("/api/ride-group/by-owner", async (req, res) => {
  try {
    const { ownerEmail } = req.body;

    if (!ownerEmail) {
      return res.status(400).json({ error: "ownerEmail is required" });
    }

    const rideGroups = await RideGroup.find({ ownerEmail });

    res.status(200).json({
      message: "Ride groups fetched successfully",
      count: rideGroups.length,
      groups: rideGroups,
    });
  } catch (error) {
    console.error("Error fetching ride groups:", error);
    res.status(500).json({ error: "Failed to fetch ride groups" });
  }
});

// Get groups by member (for both owners and members)
app.post("/api/ride-group/by-member", async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: "userEmail is required" });
    }

    // Find groups where user is either owner or member
    const rideGroups = await RideGroup.find({
      $or: [{ ownerEmail: userEmail }, { membersEmail: userEmail }],
    });

    res.status(200).json({
      message: "Ride groups fetched successfully",
      count: rideGroups.length,
      groups: rideGroups,
    });
  } catch (error) {
    console.error("Error fetching ride groups:", error);
    res.status(500).json({ error: "Failed to fetch ride groups" });
  }
});

app.delete("/api/request-to-join/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!requestId) {
      return res.status(400).json({ error: "Request ID is required" });
    }

    const deletedRequest = await RequestToJoin.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json({
      message: "Request deleted successfully",
      request: deletedRequest,
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ error: "Failed to delete request" });
  }
});

// Add these routes to your server.js file

// Create a new message
// app.post("/api/messages", async (req, res) => {
//   try {
//     const { groupId, senderEmail, content } = req.body;

//     if (!groupId || !senderEmail || !content) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Verify the sender is part of the group
//     const group = await RideGroup.findOne({ groupId });

//     if (!group) {
//       return res.status(404).json({ error: "Group not found" });
//     }

//     const isMember =
//       group.membersEmail.includes(senderEmail) ||
//       group.ownerEmail === senderEmail;

//     if (!isMember) {
//       return res
//         .status(403)
//         .json({ error: "Sender is not part of this group" });
//     }

//     const newMessage = new Message({
//       groupId,
//       senderEmail,
//       content,
//     });

//     await newMessage.save();

//     res.status(201).json({
//       message: "Message sent successfully",
//       data: newMessage,
//     });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });

// Create a new message (modified to allow any group member to send)
app.post("/api/messages", async (req, res) => {
  try {
    const { groupId, senderEmail, content } = req.body;

    if (!groupId || !senderEmail || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify the sender is part of the group (either owner or member)
    const group = await RideGroup.findOne({
      groupId,
      $or: [{ ownerEmail: senderEmail }, { membersEmail: senderEmail }],
    });

    if (!group) {
      return res
        .status(403)
        .json({ error: "Sender is not part of this group" });
    }

    const newMessage = new Message({
      groupId,
      senderEmail,
      content,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Get messages for a specific group
// app.get("/api/messages/:groupId", async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const { userEmail } = req.query;

//     if (!groupId) {
//       return res.status(400).json({ error: "Group ID is required" });
//     }

//     // Verify the requester is part of the group
//     const group = await RideGroup.findOne({ groupId });

//     if (!group) {
//       return res.status(404).json({ error: "Group not found" });
//     }

//     const isMember =
//       group.membersEmail.includes(userEmail) || group.ownerEmail === userEmail;

//     if (!isMember) {
//       return res.status(403).json({ error: "You are not part of this group" });
//     }

//     const messages = await Message.find({ groupId }).sort({ createdAt: 1 });

//     // Mark messages as read if they were sent to this user
//     if (userEmail) {
//       await Message.updateMany(
//         {
//           groupId,
//           senderEmail: { $ne: userEmail },
//           isRead: false,
//         },
//         { isRead: true }
//       );
//     }

//     res.status(200).json({
//       message: "Messages retrieved successfully",
//       data: messages,
//     });
//   } catch (error) {
//     console.error("Error retrieving messages:", error);
//     res.status(500).json({ error: "Failed to retrieve messages" });
//   }
// });

// Get messages for a specific group (modified to allow any group member)
app.get("/api/messages/:groupId", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userEmail } = req.query;

    if (!groupId || !userEmail) {
      return res
        .status(400)
        .json({ error: "Group ID and user email are required" });
    }

    // Verify the requester is part of the group (either owner or member)
    const group = await RideGroup.findOne({
      groupId,
      $or: [{ ownerEmail: userEmail }, { membersEmail: userEmail }],
    });

    if (!group) {
      return res.status(403).json({ error: "You are not part of this group" });
    }

    const messages = await Message.find({ groupId }).sort({ createdAt: 1 });

    // Mark messages as read if they were sent to this user
    if (userEmail) {
      await Message.updateMany(
        {
          groupId,
          senderEmail: { $ne: userEmail },
          isRead: false,
        },
        { isRead: true }
      );
    }

    res.status(200).json({
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
