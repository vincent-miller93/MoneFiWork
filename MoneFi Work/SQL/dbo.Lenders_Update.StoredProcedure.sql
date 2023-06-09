USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_Update]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/05/2023
-- Description: Update Lender
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Cameron Johnson
-- Note: Initial creation.
-- =============================================



CREATE PROCEDURE [dbo].[Lenders_Update]
    @Id int,
    @Name nvarchar(100),
    @Description nvarchar(500),
    @LenderTypeId int,
    @LoanTypeId int,
    @Logo nvarchar(255),
    @Website nvarchar(255),
    @LocationId int,
    @StatusId int,
    @ModifiedBy int
AS
/*
DECLARE @Id int = 54
EXEC [dbo].[Lenders_Update]
    @Name = 'Example Lender ',
	@Description = 'Example Description',
    @LenderTypeId = 3,
    @LoanTypeId = 1,
    @Logo = "https://i.imgur.com/BueqT0w.jpeg",
    @Website = 'https://www.examplelender.com',
    @LocationId = 3,
    @StatusId = 1,
    @ModifiedBy = 3,
	

SELECT * FROM [dbo].[Lenders] WHERE [Id] = @Id


*/
BEGIN
    UPDATE [dbo].[Lenders] SET
        [Name] = @Name,
        [Description] = @Description,
        [LenderTypeId] = @LenderTypeId,
        [LoanTypeId] = @LoanTypeId,
        [Logo] = @Logo,
        [Website] = @Website,
        [LocationId] = @LocationId,
        [StatusId] = @StatusId,
        [ModifiedBy] = @ModifiedBy,
        [DateModified] = GETUTCDATE()
    WHERE [Id] = @Id;

    SELECT [Id], [Name], [LenderTypeId], [LoanTypeId], [Logo], [Website], [LocationId], [StatusId], [DateCreated], [DateModified], [CreatedBy], [ModifiedBy] 
    FROM [dbo].[Lenders]
    WHERE [Id] = @Id;
END
GO
