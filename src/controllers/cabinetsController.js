const cabinetsController = {};


cabinetsController.cabinetEmpy = (req, res) => {

  res.render('cabinets/index');

};


cabinetsController.cabinetList = (req, res) => {

  req.getConnection((err, conn) => {

    conn.query('SELECT * FROM view_Gabinete', (err, Gabinetes) => {

      if (err) {
        res.json(err);
      }
      const data = { Gabinetes };
      res.json(data);

    });

  });

};

cabinetsController.cabinetAdd = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO Gabinete set ?', data, (err, customer) => {

      if (err) {
        console.log('error en la insercion');
        res.send('error');
      } else {
        console.log('Insercion correcta');
        res.send('ok');
      }

    });
  });
};


cabinetsController.cabinetUpdate = (req, res) => {

  const id = req.body.id;
  const newCabinet = req.body;

  console.log(newCabinet);

  req.getConnection((err, conn) => {

    conn.query('UPDATE Gabinete set ? where id = ?', [newCabinet, id], (err, rows) => {

      if (err) {
        console.log('error en el update');
        res.send('error');
      } else {
        console.log('update correcto');
        res.send('ok');
      }

    });
  });

};


cabinetsController.cabinetDelete = (req, res) => {
  const data = req.body;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM Gabinete WHERE id = ?', data.id, (err, rows) => {
      
      if(err){
        console.log('error');
        res.send('error');

      }else{
        console.log('ok');
        res.send('ok');
      }
      
    });
  });
}

module.exports = cabinetsController;