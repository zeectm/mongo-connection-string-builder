"use strict"
const should = require("should");
const index = require("../index");

describe("Authenticated DB connection string", function(){
  it("will return connection string no username and password when username and password arent set." , function(){
      index.getAuthenticatedConnectionString("mongodb://localhost:27017/dbname")
        .should.be.eql("mongodb://localhost:27017/dbname");
  });

  it("will return connection string with username and password", function(){
      process.env.MONGO_USER = "user";
      process.env.MONGO_PASSWORD = "password";
      index.getAuthenticatedConnectionString("mongodb://localhost:27017/dbname")
        .should.be.eql("mongodb://user:password@localhost:27017/dbname");
  });

  it("will return connection string with options added", function(){
      process.env.MONGO_USER = "bob";
      process.env.MONGO_PASSWORD = "password";

      var options = {
        authmechanism : 'MONGOCR',
        authSource : 'admin'
      }

      index.getAuthenticatedConnectionString("mongodb://localhost:27017/dbname", options)
        .should.be.eql("mongodb://bob:password@localhost:27017/dbname?authmechanism=MONGOCR&authSource=admin");
  });

  it("will return connection string with original params and additional params", function(){
      process.env.MONGO_USER = "bob";
      process.env.MONGO_PASSWORD = "password";

      var options = {
        authmechanism : 'MONGOCR',
        authSource : 'admin'
      }

      index.getAuthenticatedConnectionString("mongodb://localhost:27017/dbname?secondary=true", options)
        .should.be.eql("mongodb://bob:password@localhost:27017/dbname?secondary=true&authmechanism=MONGOCR&authSource=admin");
  });

  //   it("nothing when set to production", function(){
  //     process.env.NODE_ENV = "production";
  //     index.getCanonicalDbName("aCollection").should.be.eql("aCollection");
  //   });
  // });
});
