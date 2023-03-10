import { createServer } from "miragejs";

const initializeMockServer = () => {
  createServer({
    routes() {
      this.namespace = "api";

      this.get("/habits", () => {
        return {
          habits: [
            { id: 1, name: "Read" },
            { id: 2, name: "Drink more water"},
            { id: 3, name: "Do yoga" },
          ],
        };
      });

      this.get("/habits/:id", () => {
        return {
          habit: {
            name: "Read",
            month_data: {
              march: [ 3, 8 , 9 , 10 ]
            }
          }
        }
      })

    },
  });
};

export default initializeMockServer;
