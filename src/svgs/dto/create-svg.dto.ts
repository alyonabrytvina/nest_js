// dto - Data Transfer Object - чтобы в дальнейшем
// понимать с каким типом данных мы работаем
// тут необходимо прописать какие поля мы ожидаем, так как
// мы их менять не будем сделаем с модификатором  readonly
export class CreateSvgDto {
    readonly id: string;
    readonly name: string;
    readonly createdAt: number;
    readonly originalFileName: string;
}