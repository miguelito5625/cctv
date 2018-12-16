const controller = {};

controller.test = (req, res) => {

  // console.log(req.body.mail);
  // console.log(req.body.pass);

  // res.json({success : "Updated Successfully", status : 200});

};

controller.error404 = (req, res, next) => {

  res.status(404).render('404/index');

};


// controller.error404 = (req, res) => {


//   res.render('404/index');

// };

controller.indexPage = (req, res) => {

  // req.getConnection((err, conn) => {
  //   conn.query('SELECT * FROM customer', (err, customers) => {
  //    if (err) {
  //     res.json(err);
  //    }
  //    res.render('customers', {
  //       data: customers
  //    });
  //   });
  // });

  res.render('index');

};


controller.consulta = (req, res) => {

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


controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
      
      if (err) {
        console.log('error en la insercion');
      }

      // console.log(customer)
      console.log('Insercion correcta');
      //res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

// controller.delete = (req, res) => {
//   const { id } = req.params;
//   req.getConnection((err, connection) => {
//     connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
//       res.redirect('/');
//     });
//   });
// }

controller.delete = (req, res) => {
  const data = req.body;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', data.id, (err, rows) => {
      //res.redirect('/');
      
    });
  });
}




module.exports = controller;