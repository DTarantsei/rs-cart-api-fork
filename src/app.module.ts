import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'nest-postgres';

import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

const { HOST, LOGIN, PORT, DATABASE, PASSWORD } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRoot({
      connectionString: `postgresql://${LOGIN}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
    }),
    CartModule,
    OrderModule,
  ],
  controllers: [],
  exports: [],
  providers: [],
})
export class AppModule {}
