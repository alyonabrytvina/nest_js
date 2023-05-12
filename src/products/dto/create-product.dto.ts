// dto - Data Transfer Object - чтобы в дальнейшем
// понимать с каким типом данных мы работаем
// тут необходимо прописать какие поля мы ожидаем, так как
// мы их менять не будем сделаем с модификатором  readonly
export class CreateProductDto {
    readonly title: string;
    readonly price: number;
}