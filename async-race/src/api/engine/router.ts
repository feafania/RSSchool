import { EngineStatus } from "../../types/enum";
import {
  EngineDriveResponse,
  EngineStartResponse,
} from "../../types/interfaces";
import { ErrorHandler } from "../../utils/helpers";
import { HTTP_STATUSES } from "../../constants";

import switchEngine from "./routes/switch-engine-controller";

const EngineRouter = {
  async start(id: number): Promise<EngineStartResponse | undefined> {
    try {
      return await switchEngine(id, EngineStatus.start);
    } catch (error) {
      console.error(`Error starting car's with id {${id} engine:`, error);
      return undefined;
    }
  },

  async stop(id: number): Promise<boolean> {
    try {
      await switchEngine(id, EngineStatus.stop);
      return true;
    } catch (error) {
      console.error(`Error stopping car's with id {${id} engine:`, error);
      return false;
    }
  },

  async drive(id: number): Promise<EngineDriveResponse> {
    const driveResponse = {
      success: false,
      broke: false,
      drive: false,
    };
    try {
      await switchEngine(id, EngineStatus.drive);
      driveResponse.success = true;
      return driveResponse;
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage === "500") {
        console.warn(
          `Car ID ${id} has been stopped suddenly. It's engine was broken down.`,
        );
        driveResponse.broke = true;
      } else if (errorMessage === "429") {
        console.warn("Drive already in progress.");
        console.warn(
          `You can't run drive for the same car ID ${id} twice while it's not stopped.`,
        );
        driveResponse.drive = true;
      } else {
        ErrorHandler(
          error as Response | Error,
          HTTP_STATUSES.NOT_FOUND_404,
          `Car with ID ${id} not found.`,
          `Failed to drive car's engine with id ${id}`,
          console.error,
        );
      }
      return driveResponse;
    }
  },
};

export default EngineRouter;
