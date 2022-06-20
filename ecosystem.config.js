module.exports = {
    apps: [
      {
        name: "databyte-backend-contrato",
        script: "./src/index.js",
        error_file: "./src/logs/err.log",
        out_file: "./src/logs/out.log",
        time: true,
        args: "one two",
        instances: "max",
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  