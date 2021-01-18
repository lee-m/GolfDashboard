using System;

namespace GolfDashboard
{
    public class DistanceUtils
    {
        const double MilesToKilometersConversionFactor = 1.609344;
        const double KilometersToMilesConversionFactor = 1.0 / MilesToKilometersConversionFactor;
        const double MeanEarthRadiusInKilometers = 6371.0;

        //Shamelessly borrowed from Xamarin Essentials
        public static double DistanceBetweenPositionsInMiles(double lat1, double lon1, double lat2, double lon2)
        {
            if (lat1 == lat2 && lon1 == lon2)
                return 0;

            var dLat = DegreesToRadians(lat2 - lat1);
            var dLon = DegreesToRadians(lon2 - lon1);

            lat1 = DegreesToRadians(lat1);
            lat2 = DegreesToRadians(lat2);

            var dLat2 = Math.Sin(dLat / 2) * Math.Sin(dLat / 2);
            var dLon2 = Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            var a = dLat2 + (dLon2 * Math.Cos(lat1) * Math.Cos(lat2));
            var c = 2 * Math.Asin(Math.Sqrt(a));

            return KilometersToMiles(MeanEarthRadiusInKilometers * c);
        }

        private static double DegreesToRadians(double degrees) =>
            degrees * (Math.PI / 180.0);

        private static double KilometersToMiles(double kilometers) =>
            kilometers * KilometersToMilesConversionFactor;
    }
}
