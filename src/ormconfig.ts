let connection = null;

let baseConnection: any = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/app-dev',
  entities: [
    'src/models/*.{ts,js}',
  ],
  synchronize: false,
  logging: false,
  migrationsTableName: 'orm_data_migrations',
  migrations: ['src/db/migrations/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src/common/models',
  },
};

export const defaultConnection = {
  ...baseConnection,
  name: 'default',
};

const testConnection = {
  ...baseConnection,
  dropSchema: true,
  synchronize: false,
  url: process.env.TEST_DATABASE_URL || 'postgres://postgres:password@localhost:5432/app-test',
};

const seedConnection = {
  name: 'seed',
  migrationsTableName: 'orm_data_seeds',
  migrations: ['src/db/seeds/*.{ts,js}'],
  dropSchema: false,
  cli: {
    entitiesDir: 'src/common/models',
    migrationsDir: 'src/db/seeds',
  },
};

const demoSeedConnection = {
  name: 'demo-seed',
  migrationsTableName: 'orm_data_demo_seeds',
  migrations: ['src/db/demo-seeds/*.{ts,js}'],
  dropSchema: false,
  cli: {
    entitiesDir: 'src/common/models',
    migrationsDir: 'src/db/demo-seeds',
  },
};

const seedConnections = [];

if (process.env.TEST_DB !== 'true') {
  seedConnections.push(
    ...[
      { ...baseConnection, ...demoSeedConnection },
      { ...baseConnection, ...seedConnection },
    ],
  );
  connection = [defaultConnection, ...seedConnections];
} else {
  seedConnections.push(
    ...[
      { ...testConnection, ...demoSeedConnection },
      { ...testConnection, ...seedConnection },
    ],
  );
  connection = [testConnection, ...seedConnections];
  // console.log(`process.env.TEST_DB: ${process.env.TEST_DB}`);
  // console.log(module.exports);
}

export default connection;
