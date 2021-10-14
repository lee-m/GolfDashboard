using Microsoft.EntityFrameworkCore.Migrations;

namespace GolfDashboard.Data.Migrations
{
    public partial class TeeBoxRatingTypeChangeAddSlope : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Rating",
                table: "TeeBoxes",
                type: "REAL",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Slope",
                table: "TeeBoxes",
                type: "INTEGER",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slope",
                table: "TeeBoxes");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "TeeBoxes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "REAL",
                oldNullable: true);
        }
    }
}
