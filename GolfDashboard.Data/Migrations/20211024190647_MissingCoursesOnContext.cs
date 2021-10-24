using Microsoft.EntityFrameworkCore.Migrations;

namespace GolfDashboard.Data.Migrations
{
    public partial class MissingCoursesOnContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_GolfClubs_GolfClubID",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_TeeBoxes_Course_CourseID",
                table: "TeeBoxes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Course",
                table: "Course");

            migrationBuilder.RenameTable(
                name: "Course",
                newName: "Courses");

            migrationBuilder.RenameIndex(
                name: "IX_Course_GolfClubID",
                table: "Courses",
                newName: "IX_Courses_GolfClubID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Courses",
                table: "Courses",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_GolfClubs_GolfClubID",
                table: "Courses",
                column: "GolfClubID",
                principalTable: "GolfClubs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TeeBoxes_Courses_CourseID",
                table: "TeeBoxes",
                column: "CourseID",
                principalTable: "Courses",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_GolfClubs_GolfClubID",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_TeeBoxes_Courses_CourseID",
                table: "TeeBoxes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Courses",
                table: "Courses");

            migrationBuilder.RenameTable(
                name: "Courses",
                newName: "Course");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_GolfClubID",
                table: "Course",
                newName: "IX_Course_GolfClubID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Course",
                table: "Course",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_GolfClubs_GolfClubID",
                table: "Course",
                column: "GolfClubID",
                principalTable: "GolfClubs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TeeBoxes_Course_CourseID",
                table: "TeeBoxes",
                column: "CourseID",
                principalTable: "Course",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
