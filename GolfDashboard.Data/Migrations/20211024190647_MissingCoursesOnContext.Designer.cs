﻿// <auto-generated />
using System;
using GolfDashboard.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GolfDashboard.Data.Migrations
{
    [DbContext(typeof(GolfDashboardDbContext))]
    [Migration("20211024190647_MissingCoursesOnContext")]
    partial class MissingCoursesOnContext
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.11");

            modelBuilder.Entity("GolfDashboard.Models.Course", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("GolfClubID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("NumberOfHoles")
                        .HasColumnType("INTEGER");

                    b.HasKey("ID");

                    b.HasIndex("GolfClubID");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("GolfDashboard.Models.GolfClub", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<int>("DisplaySequence")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<double>("Longitude")
                        .HasColumnType("REAL");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Website")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("GolfClubs");
                });

            modelBuilder.Entity("GolfDashboard.Models.Note", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("GolfDashboard.Models.Tag", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("GolfDashboard.Models.TeeBox", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Colour")
                        .HasColumnType("TEXT");

                    b.Property<int?>("CourseID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Par")
                        .HasColumnType("INTEGER");

                    b.Property<float?>("Rating")
                        .HasColumnType("REAL");

                    b.Property<int?>("SSS")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Slope")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Yards")
                        .HasColumnType("INTEGER");

                    b.HasKey("ID");

                    b.HasIndex("CourseID");

                    b.ToTable("TeeBoxes");
                });

            modelBuilder.Entity("NoteTag", b =>
                {
                    b.Property<int>("NotesID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TagsID")
                        .HasColumnType("INTEGER");

                    b.HasKey("NotesID", "TagsID");

                    b.HasIndex("TagsID");

                    b.ToTable("NoteTag");
                });

            modelBuilder.Entity("GolfDashboard.Models.Course", b =>
                {
                    b.HasOne("GolfDashboard.Models.GolfClub", null)
                        .WithMany("Courses")
                        .HasForeignKey("GolfClubID");
                });

            modelBuilder.Entity("GolfDashboard.Models.TeeBox", b =>
                {
                    b.HasOne("GolfDashboard.Models.Course", null)
                        .WithMany("TeeBoxes")
                        .HasForeignKey("CourseID");
                });

            modelBuilder.Entity("NoteTag", b =>
                {
                    b.HasOne("GolfDashboard.Models.Note", null)
                        .WithMany()
                        .HasForeignKey("NotesID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GolfDashboard.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GolfDashboard.Models.Course", b =>
                {
                    b.Navigation("TeeBoxes");
                });

            modelBuilder.Entity("GolfDashboard.Models.GolfClub", b =>
                {
                    b.Navigation("Courses");
                });
#pragma warning restore 612, 618
        }
    }
}
