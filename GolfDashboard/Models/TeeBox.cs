namespace GolfDashboard.Models
{
    public class TeeBox
    {
        private TeeBox()
        { }

        public TeeBox(int id, string colour, int yards, int par, int? sss, float? rating, int? slope)
        {
            ID = id;
            Colour = colour;
            Yards = yards;  
            Par = par;  
            SSS = sss;
            Rating = rating;
            Slope = slope;  
        }

        public int ID { get; set; }
        public string Colour { get; set; }
        public int Yards { get; set; }
        public int Par {  get; set; }
        public int? SSS { get; set; }
        public float? Rating { get; set; }
        public int? Slope { get; set; }
    }
}
