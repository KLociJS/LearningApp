using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Addfulltextsearchvector : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "Articles",
                type: "tsvector",
                nullable: false)
                .Annotation("Npgsql:TsVectorConfig", "english")
                .Annotation("Npgsql:TsVectorProperties", new[] { "Title", "Description", "Markdown" });

            migrationBuilder.CreateIndex(
                name: "IX_Articles_SearchVector",
                table: "Articles",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Articles_SearchVector",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "SearchVector",
                table: "Articles");
        }
    }
}
