import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  @Prop({ unique: [true, 'Username already used'] })
  name: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: string;

  @Prop()
  wight: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
