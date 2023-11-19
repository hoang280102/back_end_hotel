const db = require("../db.js");

const inforRoomAll = (req, res) => {
  db.query("select * from room", (err, result) => {
    if (err) {
      res.status(404).send({ err: true });
    }
    res.status(200).json(result);
  });
};
const inforRoomOne = (req, res) => {
  const room_id = req.params.id;
  if (!room_id) {
    return res.status(404).send({ err: true });
  }
  db.query("select * from room where Id = ?", room_id, (err, result) => {
    if (err) {
      res.status(404).send({ err: true });
    }
    res.status(200).json(result);
  });
};

const addRoom = (req, res) => {
  const { id, type, price, status } = req.body;
  if (!id) {
    return res.status(404).send({ err: true });
  }
  db.query(
    "insert into room (id, type, price, status) values(?,?,?,?)",
    [id, type, price, status],
    (err, result) => {
      if (err) {
        res.status(404).send({ err: true });
      }
      const newRoom = result.insertId;
      res.status(200).json(newRoom);
    }
  );
};

const updateRoom = (req, res) => {
  const { id, type, price, status } = req.body;
  if (!id) {
    res.status(404).send({ err: true });
  }
  db.query(
    "update room set type = ?,price=?,status=? where id=?",
    [type, price, status, id],
    (err, result) => {
      if (err) res.status(404).send({ err: true });
      res.status(200).json({ message: "success" });
    }
  );
};

const deleteRoom = (req, res) => {
  const room_id = req.params.id;
  if (!room_id) res.status(404).send({ err: true });
  db.query("delete from room where Id = ?", room_id, (err, result) => {
    if (err) res.status(404).send({ err: true });
    res.status(200).json({ message: "success" });
  });
};

module.exports = {
  inforRoomAll,
  inforRoomOne,
  addRoom,
  updateRoom,
  deleteRoom,
};
