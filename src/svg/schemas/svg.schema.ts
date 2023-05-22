import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Svg {
    @Prop()
    id: string;

    @Prop()
    createdAt: Date;

    @Prop()
    svg: string;

    @Prop()
    liked: boolean;
}

export const SvgSchema = SchemaFactory.createForClass(Svg);
export type SvgDocument = Svg & Document;

