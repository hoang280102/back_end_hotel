const db = require("../db.js");
const booked = "booked";

const bookingRoom = (req, res) => {
  const { room_id, quantity, status } = req.body;
  if (!room_id) return res.status(400).json({ error: err });
  if (quantity > 4) return res.status(400).json({ error: err });
  if (status !== "empty")
    return res.status(200).json({ message: "Phong da co nguoi book" });
  db.query("Select * from booking where room_id =?", room_id, (err, result) => {
    if (err) {
      return res.status(err).json({ error: err });
    }
    db.query(
      "update booking set status= 'booked' where room_id =?",
      [room_id],
      (err) => {
        if (err) return res.status(err).json({ error: err });
      }
    );
    db.query(
      "insert into booking (room_id, quantity) values (?, ?)",
      [room_id, quantity],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        const newBookingId = result.insertId;
        res.status(200).json({ id: newBookingId, room_id, quantity });
      }
    );
  });
};
const inforBookingRoomEmpty = (req, res) => {
  db.query("select * from booking where status ='empty'", (err, result) => {
    if (err) {
      res.status(404).send({ err: true });
    }
    res.status(200).json(result);
  });
};
module.exports = { bookingRoom, inforBookingRoomEmpty };
