using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Fixarticletagsrelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Articles_ArticleId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_ArticleId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Tags");

            migrationBuilder.CreateTable(
                name: "ArticleTags",
                columns: table => new
                {
                    ArticleId = table.Column<Guid>(type: "uuid", nullable: false),
                    TagId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleTags", x => new { x.ArticleId, x.TagId });
                    table.ForeignKey(
                        name: "FK_ArticleTags_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArticleTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleTags_TagId",
                table: "ArticleTags",
                column: "TagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticleTags");

            migrationBuilder.AddColumn<Guid>(
                name: "ArticleId",
                table: "Tags",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_ArticleId",
                table: "Tags",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Articles_ArticleId",
                table: "Tags",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id");
        }
    }
}
