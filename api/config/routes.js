const createError = require('http-errors');

module.exports = (app, passport) => {
  const userRouter = require('../routes/user')(passport)

  // PUT ROUTES HERE
  app.use('/user', userRouter)

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      },
    });
  });
}