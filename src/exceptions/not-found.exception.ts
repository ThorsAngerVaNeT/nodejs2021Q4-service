import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id '${id}' not found!`);
  }
}
