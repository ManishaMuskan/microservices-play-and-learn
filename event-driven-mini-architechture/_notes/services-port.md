# Manual microservices architecture using async communication [event-based communication]

This is a basic manual setup to understand asynchronous communication between microservices, simulating the behavior of tools like Kafka, RabbitMQ, or NATS. It is not production-grade; production setups would use specialized tools and advanced techniques.

### TechStack

MERN

### Features of the project

1. **Add Posts**

   - Users can create posts by providing a title.
   - Posts are stored and displayed in a list.

2. **Add Comments**

   - Users can add comments to existing posts.
   - Each comment is associated with a specific post.

3. **Comment Moderation**

   - The system will automatically filter comments containing foul words like "orange" or "banana".
     Comments are assigned a status:

     - Approved: Displayed under the respective post.
     - Rejected: Not displayed.

   - This ensures only clean and appropriate comments are visible.

### Services running on port

1. Client - 3000
2. Event Bus - 4000
3. Posts Service - 4001
4. Comments Service - 4002
5. Query Service - 4003
6. Moderation Service - 4004

### Reference

https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19098956#overview
