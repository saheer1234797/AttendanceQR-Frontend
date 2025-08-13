export const BASE_URL="http://localhost:3000";
export default {
 SignUp: BASE_URL+"/user/register",
 SignIn:BASE_URL+"/user/login",
 Logout:BASE_URL+"/user/logout",
 Teacherdashbpord:BASE_URL+"/admin/alldata",
 AdminAll:BASE_URL+"/admin/all",
  GenerateQR:BASE_URL+"/qr/generateQR",

  Profile:BASE_URL+"/user/profile"
,
QR:BASE_URL+"/scanQR/scanQR",

          StudentAttendance:BASE_URL+"/Attendce/st",
          SendEmail:BASE_URL+"/email/email"


}