import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ProfileUserController } from "@modules/cars/useCases/profileUser/ProfileUserController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", new CreateUserController().handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  new UpdateUserAvatarController().handle
);

usersRoutes.get(
  "/profile",
  ensureAuthenticated,
  new ProfileUserController().handle
);

export { usersRoutes };
