import Server from './services/server';

const PORT = process.env.PORT || 8080;

Server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
Server.on('error', (error) => console.log(`Server error: ${error}`));
