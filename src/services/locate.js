class LocateService {
  long = null;
  lat = null;
  constructor(long, lat) {
    this.long = long;
    this.lat = lat;
  }
  Check(longCheck, latCheck, radius) {
    try {
      longCheck = Math.round(longCheck.toFixed(6) * 100000) / 100000;
      latCheck = Math.round(latCheck.toFixed(6) * 100000) / 100000;
      var a = 6378137,
        b = 6356752.3142,
        f = 1 / 298.257223563, // WGS-84 ellipsoid params
        L = this.deg2rad(longCheck - this.long),
        x = Math.atan(1 - f),
        U1 = x * Math.tan(this.deg2rad(this.lat)),
        U2 = x * Math.tan(this.deg2rad(latCheck)),
        sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1),
        sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2),
        lambda = L,
        lambdaP,
        iterLimit = 100;
      do {
        var sinLambda = Math.sin(lambda),
          cosLambda = Math.cos(lambda),
          sinSigma = Math.sqrt(
            cosU2 * sinLambda * (cosU2 * sinLambda) +
              (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
                (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda),
          );
        if (sinSigma === 0) {
          return false; // co-incident points
        }
        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda,
          sigma = Math.atan2(sinSigma, cosSigma),
          sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma,
          cosSqAlpha = 1 - sinAlpha * sinAlpha,
          cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha,
          C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        if (isNaN(cos2SigmaM)) {
          cos2SigmaM = 0; // equatorial line: cosSqAlpha = 0 (§6)
        }
        lambdaP = lambda;
        lambda =
          L +
          (1 - C) *
            f *
            sinAlpha *
            (sigma +
              C *
                sinSigma *
                (cos2SigmaM +
                  C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
      } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

      if (iterLimit === 0) {
        return false; // formula failed to converge
      }

      var uSq = (cosSqAlpha * (a * a - b * b)) / (b * b),
        A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq))),
        B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq))),
        deltaSigma =
          B *
          sinSigma *
          (cos2SigmaM +
            (B / 4) *
              (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
                (B / 6) *
                  cos2SigmaM *
                  (-3 + 4 * sinSigma * sinSigma) *
                  (-3 + 4 * cos2SigmaM * cos2SigmaM))),
        d = b * A * (sigma - deltaSigma);
      return d < radius;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  deg2rad(deg) {
    return (deg * Math.PI) / 180.0;
  }
}
export default LocateService;
