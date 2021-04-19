namespace GolfDashboard.API
{
    public class CORSOptions
    {
        public string[] AllowedOrigins { get; set; }
        public string[] Methods { get; set; }
        public string[] Headers { get; set; }
    }
}
