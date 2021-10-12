using Microsoft.EntityFrameworkCore.Migrations;

namespace GolfDashboard.Data.Migrations
{
    public partial class TeeBoxes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "SSS",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "Slope",
                table: "Course");

            migrationBuilder.CreateTable(
                name: "TeeBoxes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Colour = table.Column<string>(type: "TEXT", nullable: true),
                    Yards = table.Column<int>(type: "INTEGER", nullable: false),
                    Par = table.Column<int>(type: "INTEGER", nullable: false),
                    SSS = table.Column<int>(type: "INTEGER", nullable: true),
                    Rating = table.Column<int>(type: "INTEGER", nullable: true),
                    CourseID = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeeBoxes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TeeBoxes_Course_CourseID",
                        column: x => x.CourseID,
                        principalTable: "Course",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeeBoxes_CourseID",
                table: "TeeBoxes",
                column: "CourseID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeeBoxes");

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "Course",
                type: "REAL",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SSS",
                table: "Course",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Slope",
                table: "Course",
                type: "INTEGER",
                nullable: true);
        }
    }
}
