var plan = require("flightplan");
plan.target("wallet-web", {
  host: "47.92.36.225",
  username: "root",
  agent: process.env.SSH_AUTH_SOCK
});
plan.remote(function(remote) {
  remote.log("Pull application from gitlab");
  remote.with("cd /data/repos/wallet-web", function() {
    remote.exec("git pull origin master");
    remote.exec("git checkout master");
    remote.exec("pm2 delete wallet-web");
    remote.exec("pm2 start app.js --name wallet-web");
  });
});