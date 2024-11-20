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

### Notes on Missing Events and Implementation:

- **Issue with Missing Events**:
  Events are not being synchronized properly. This could be due to issues in the current implementation.

- **Reason for No Immediate Fix**:
  Debugging and fixing are not prioritized because:

  - This setup is intended only for conceptual learning about microservices communication.
  - It is not designed for production-grade use.

- **Tutorial Code Reference**:

  - Tutorial code has been included for comparison and future reference.
  - It can serve as a guide for refining or re-implementing the logic when needed.

This setup is primarily for understanding, and a more robust solution should use tools like Kafka, RabbitMQ, or NATS for reliable communication.
