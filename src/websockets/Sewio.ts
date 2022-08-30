class Sewio {
  socket: WebSocket;
  tagId: string;
  positionX: '115';
  positionY: '140';
  distance: string;
  speed: string;
  lapTime: number;
  raceTime: number;
  hasStartedRace: boolean;
  hasLeftStartArea: boolean;

  constructor(tagId: string) {
    this.socket = new WebSocket('ws://192.168.101.216:80');
    this.tagId = tagId;
    this.positionX = '115';
    this.positionY = '140';
    this.distance = '0';
    this.speed = '0';
    this.lapTime = 0;
    this.raceTime = 0;
    this.hasStartedRace = false;
    this.hasLeftStartArea = false;
    this.open();
  }

  async open() {
    try {
      await this.connect();
    } catch (err) {
      console.log(err);
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.socket.onopen = () => {
        this.socket.send(
          `{"headers":{"X-ApiKey":"171555a8fe71148a165392904"},"method":"subscribe", "resource":"/feeds/${this.tagId}"}`,
        );
        resolve(this.socket);
      };
      this.socket.onerror = function (err) {
        reject(err);
      };
    });
  }

  getPosition(event: WebSocketMessageEvent) {
    const data = JSON.parse(event.data);
    if (
      data.body.datastreams.find((tag: any) => tag.id === 'posX') &&
      data.body.datastreams.find((tag: any) => tag.id === 'posY')
    ) {
      this.positionX = data.body.datastreams.find(
        (tag: any) => tag.id === 'posX',
      ).current_value;
      this.positionY = data.body.datastreams.find(
        (tag: any) => tag.id === 'posY',
      ).current_value;
    }

    if (
      data.body.zones &&
      data.body.zones.find((zone: any) => zone.name === 'Start')
    ) {
      this.hasStartedRace = true;
      this.hasLeftStartArea = false;
    }
    if (
      this.hasStartedRace &&
      !this.hasLeftStartArea &&
      (!data.body.zones ||
        (data.body.zones &&
          data.body.zones.find((zone: any) => zone.name !== 'Start')))
    ) {
      this.hasLeftStartArea = true;
    }

    return {
      hasStartedRace: this.hasStartedRace,
      hasLeftStartArea: this.hasLeftStartArea,
    };
  }
}

export default Sewio;
