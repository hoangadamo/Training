export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}

// write cat service and controller for me, if missing info return status 400 with message: "missing info", if success return status 200 and cat info (nestjs)