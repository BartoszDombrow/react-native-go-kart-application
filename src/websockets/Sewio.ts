class Sewio {
  socket: WebSocket;
  tagId: string;
  positionX: string;
  positionY: string;
  distance: string;
  speed: string;
  lapTime: string;
  raceTime: string;

  constructor(tagId: string) {
    this.socket = new WebSocket('ws://192.168.101.216:80');
    this.tagId = tagId;
    this.positionX = '';
    this.positionY = '';
    this.distance = '';
    this.speed = '';
    this.lapTime = '';
    this.raceTime = '';
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
    } else {
      return;
    }
  }
}

export default Sewio;
