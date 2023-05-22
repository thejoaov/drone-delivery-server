import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PriorityQueue } from '../utils/PriorityQueue';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class DeliveryService {
  constructor(private httpService: HttpService) {}

  getTravelTimes() {
    return this.httpService
      .get('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f')
      .pipe(map((response) => response.data))
      .toPromise();
  }

  findShortestPath(graph: any, start: string, end: string) {
    const costs = {};
    const visited: string[] = [];
    const previous: { [key: string]: string | null } = {};
    const queue = new PriorityQueue();

    // Initialize costs and previous
    for (const key in graph) {
      if (Object.prototype.hasOwnProperty.call(graph, key)) {
        costs[key] = Infinity;
        previous[key] = null;
      }
    }

    costs[start] = 0;
    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
      const current = queue.dequeue().val;

      if (current === end) {
        break;
      }

      if (!visited.includes(current)) {
        visited.push(current);

        for (const neighbor in graph[current]) {
          if (Object.prototype.hasOwnProperty.call(graph[current], neighbor)) {
            const newCost = costs[current] + graph[current][neighbor];

            if (newCost < costs[neighbor]) {
              costs[neighbor] = newCost;
              previous[neighbor] = current;
              queue.enqueue(neighbor, newCost);
            }
          }
        }
      }
    }

    const shortestPath = [];
    let currentNode = end;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = previous[currentNode];
    }

    return {
      path: shortestPath,
      time: costs[end],
    };
  }

  calculateBestRoute(
    graph: any,
    droneStart: string,
    objectPickup: string,
    deliveryDestination: string,
  ) {
    if (
      !graph[droneStart] ||
      !graph[objectPickup] ||
      !graph[deliveryDestination]
    ) {
      throw new HttpException(
        'One or more of the specified points do not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const toObject = this.findShortestPath(graph, droneStart, objectPickup);
    const toDestination = this.findShortestPath(
      graph,
      objectPickup,
      deliveryDestination,
    );

    return {
      path: toObject.path.concat(toDestination.path.slice(1)),
      totalTime: toObject.time + toDestination.time,
    };
  }
}
