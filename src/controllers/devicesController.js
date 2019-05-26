const controller = {};

controller.error404 = (req, res, next) => {

  res.status(404).render('404/index');

};


controller.indexPage = (req, res) => {

  res.render('index');

};

controller.devicesPage = (req, res) => {

  res.render('devices/index');

};


controller.deviceList = (req, res) => {

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM view_Dispositivo', (err, Dispositivos) => {
      if (err) {
        res.json(err);
      }
      const data = { Dispositivos };
      res.json(data);
    });
  });


};

controller.typeDeviceList = (req, res) => {

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tipoDispositivo', (err, tipoDispositivo) => {
      if (err) {
        res.json(err);
      }
      const data = { tipoDispositivo };
      res.json(data);
    });
  });


};


controller.brandsList = (req, res) => {

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Marca', (err, Marca) => {
      if (err) {
        res.json(err);
      }
      const data = { Marca };
      res.json(data);
    });
  });


}; 


controller.devicesAdd = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO Dispositivo set ?', data, (err, Dispositivo) => {

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

controller.devicesAddNewTypeDivice = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO tipoDispositivo set ?', data, (err, customer) => {

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

controller.devicesAddNewBrand = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO Marca set ?', data, (err, customer) => {

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


controller.devicesUpdate = (req, res) => {

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


controller.devicesDelete = (req, res) => {
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


 controller.deviceState = (req, res) => {
  const data = req.body;
  const id  = data.id;
  const state = data.state;
  req.getConnection((err, connection) => {
    connection.query('call cambiar_estado_dispositivo(?,?)', [id, state], (err, rows) => {
      
      if(err){
        console.log('error on state change');
        res.send('error');

      }else{
        console.log('ok state changed');
        res.send('ok');
      }
      
    });
  });
}



module.exports = controller;