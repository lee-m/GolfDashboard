﻿namespace GolfDashboard.DTO
{
    public class TeeBoxDTO
    {
        public int ID { get; set; }
        public string Colour { get; set; }
        public int Yards { get; set; }
        public int Par { get; set; }
        public int? SSS { get; set; }
        public float? Rating { get; set; }
        public int? Slope { get; set; }
    }
}
