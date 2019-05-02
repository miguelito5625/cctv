const controller = {};

controller.error404 = (req, res, next) => {

  res.status(404).render('404/index');

};


controller.indexPage = (req, res) => {

  res.render('index');

};

controller.camsPage = (req, res) => {

  res.render('cams/index');

};


controller.camList = (req, res) => {

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM customer', (err, customers) => {
      if (err) {
        res.json(err);
      }
      const data = { customers };
      res.json(data);
    });
  });


};


controller.camsAdd = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {

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


controller.camsUpdate = (req, res) => {

  const id = req.body.id;
  const newCustomer = req.body;

  req.getConnection((err, conn) => {

    conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {

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


controller.camsDelete = (req, res) => {
  const data = req.body;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', data.id, (err, rows) => {
      
      if(err){
        console.log('error');
      }else{
        console.log('ok');
      }
      
    });
  });
}




module.exports = controller;