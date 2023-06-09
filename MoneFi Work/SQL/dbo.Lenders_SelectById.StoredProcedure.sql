USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_SelectById]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/05/2023
-- Description: Select Lender By Id
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Cameron Johnson
-- Note: Initial creation.
-- =============================================


CREATE PROCEDURE [dbo].[Lenders_SelectById]
    @Id int
AS

/*
DECLARE @Id int = 68 
EXEC [dbo].[Lenders_SelectById]
    @Id
*/
BEGIN
   
    SELECT 
        [L].[Id], 
        [L].[Name], 
        [L].[Description],
        [LT].[Id] AS [LenderTypeId],
        [LT].[Name] AS [LenderTypeName],
        [LoT].[Id] AS [LoanTypeId], 
        [LoT].[Name] AS [LoanTypeName], 
        [ST].[Id] AS [StatusId],
        [ST].[Name] AS [StatusName], 
        [Loc].[Id] AS [LocationId], 
        [Loc].[LocationTypeId], 
        [Loc].[LineOne], 
        [Loc].[LineTwo], 
        [Loc].[City], 
        [Loc].[Zip], 
        [Loc].[StateId], 
        [S].[Name] AS [StateName], 
        [Loc].[Latitude], 
        [Loc].[Longitude], 
        [Loc].[DateCreated], 
        [Loc].[DateModified], 
        [Loc].[CreatedBy], 
        [Loc].[ModifiedBy], 
		[Loc].[IsDeleted] AS [LocationIsDeleted],
        [L].[Logo], 
        [L].[Website], 
        [L].[DateCreated], 
        [L].[DateModified], 
		[UC].Id, 
		UC.FirstName,
		UC.LastName,
		UC.Mi,
		UC.AvatarUrl,
        [UM].Id,
		UM.FirstName,
		UM.LastName,
		UM.Mi,
		UM.AvatarUrl
    FROM [dbo].[Lenders] AS [L]
    INNER JOIN [dbo].[LenderTypes] AS [LT]
        ON [L].[LenderTypeId] = [LT].[Id]
    INNER JOIN [dbo].[LoanTypes] AS [LoT]
        ON [LoT].[Id] = [L].[LoanTypeId]
    INNER JOIN [dbo].[StatusTypes] AS [ST]
        ON [ST].[Id] = [L].[StatusId]
    INNER JOIN [dbo].[Locations] AS [Loc]
        ON [Loc].[Id] = [L].[LocationId]
    INNER JOIN [dbo].[States] AS [S]
        ON [S].[Id] = [Loc].[StateId]
	INNER JOIN dbo.Users as UC
		ON L.CreatedBy = UC.Id
	INNER JOIN dbo.Users as UM
		ON L.ModifiedBy = UM.Id
    WHERE [L].[Id] = @Id;

END

GO
