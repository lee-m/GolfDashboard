namespace GolfDashboard.Models
{
    public class TeeBox
    {
        public int ID { get; set; }
        public string Colour { get; set; }
        public string Name { get; set; }
        public int? Yards { get; set; }
        public int? Par {  get; set; }
        public int? SSS { get; set; }
        public int? Rating { get; set; }
    }
}
