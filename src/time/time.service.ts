import { Injectable } from '@nestjs/common';


@Injectable()
export class TimeService {
  getCurrentTime() {
    return { currentTime: new Date().toISOString() }; // Return UTC time as ISO string
  }

}
