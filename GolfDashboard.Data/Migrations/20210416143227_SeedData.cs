using System.Text.Json;

using Microsoft.EntityFrameworkCore.Migrations;

namespace GolfDashboard.Data.Migrations
{
    public partial class SeedData : Migration
    {
        private const string DisplaySequenceProperty = "DisplaySequence";
        private const string NameProperty = "Name";
        private const string AddressProperty = "Address";
        private const string WebsiteProperty = "Website";
        private const string LatProperty = "Latitude";
        private const string LongProperty = "Longitude";

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var doc = JsonDocument.Parse(Properties.Resources.GolfClubs);
            var columns = new[] { DisplaySequenceProperty, NameProperty, AddressProperty, WebsiteProperty, LatProperty, LongProperty };

            foreach (var club in doc.RootElement.EnumerateArray())
            {
                var values = new object[]
                {
                    club.GetProperty(DisplaySequenceProperty).GetInt32(),
                    club.GetProperty(NameProperty).GetString(),
                    club.GetProperty(AddressProperty).GetString(),
                    club.GetProperty(WebsiteProperty).GetString(),
                    club.GetProperty(LatProperty).GetDouble(),
                    club.GetProperty(LongProperty).GetDouble()
                };

                migrationBuilder.InsertData("GolfClubs", columns, values);
                migrationBuilder.InsertData("Tags", "Text", "Swing ");
                migrationBuilder.InsertData("Tags", "Text", "Putting");
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("truncate table GolfClubs");
        }
    }
}
