import { createServer, Model } from "miragejs";

const initializeMockServer = () => {
  createServer({
    models: {
      habits: Model,
    },
    
    routes() {
      this.namespace = "api";

      this.get("/habits", (schema, request) => {
        return schema.habits.all()
      });

      this.get("/habits/:id", (schema, request) => {
        let id = request.params.id;
        return schema.habits.find(id);
      })
      this.patch("/habits/:id", (schema, request) => {
        let updatedProp = JSON.parse(request.requestBody);
        let id = request.params.id;
        let habit = schema.habits.find(id);
        return habit.update(updatedProp);
      })
    },

    seeds(server) {
      server.create('habit', {id: "1", name: 'Drink', month_data: [1, 3, 5]})
      server.create('habit', {id: "2", name: 'Yoga', month_data: [10, 23, 28]})
      server.create('habit', {id: "3", name: 'Read', month_data: [12, 13, 14]})
    },
  });
};

export default initializeMockServer;
