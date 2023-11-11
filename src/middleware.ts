export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/users/mypage",
    "/stores/nex",
    "/stores/:id/edit",
    "/users/likes",
    "/stores/new",
  ],
};
