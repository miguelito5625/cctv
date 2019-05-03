const cabinetsController = {};


cabinetsController.cabinetEmpy = (req, res) => {

  res.render('cabinets/index');

};


cabinetsController.cabinetList = (req, res) => {

  req.getConnection((err, conn) => {

    conn.query('SELECT * FROM Gabinete', (err, Gabinetes) => {

      if (err) {
        res.json(err);
      }
      const data = { Gabinetes };
      res.json(data);

    });

  });

};






module.exports = cabinetsController;