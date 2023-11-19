const { Router } = require("express");
const Room = require("../controller/roomController.js");
const Booking = require("../controller/bookController.js");
const router = Router();

//rooms
router.get("/rooms", Room.inforRoomAll);
router.get("/rooms/:id", Room.inforRoomOne);
router.post("/rooms", Room.addRoom);
router.put("/rooms", Room.updateRoom);
router.delete("/rooms/:id", Room.deleteRoom);

// booking
router.post("/bookings", Booking.bookingRoom);
router.get("/bookings", Booking.inforBookingRoomEmpty);
module.exports = router;
