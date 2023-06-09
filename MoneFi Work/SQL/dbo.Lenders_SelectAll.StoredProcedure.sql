USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_SelectAll]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/05/2023
-- Description: Select All Lenders(NOT Paginated)
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Cameron Johnson
-- Note: Initial creation.
-- =============================================



CREATE PROCEDURE [dbo].[Lenders_SelectAll]
AS
/*
EXEC [dbo].[Lenders_SelectAll];
*/
BEGIN
   
    SELECT 
        [L].[Id], 
        [L].[Name], 
        [LT].Id as LenderTypeId,
        [LT].[Name] as LenderTypeName,
        [LoT].[Id] as LoanTypeId, 
        [LoT].[Name] as LoanTypeName, 
        [ST].[Id] as StatusId,
        [ST].[Name] as StatusName, 
        (
            SELECT 
                [Loc].[Id] as LocationId,
                [Loc].[LocationTypeId], 
                [Loc].[LineOne], 
                [Loc].[LineTwo], 
                [Loc].[City], 
                [Loc].[Zip], 
                [Loc].[StateId], 
                [Loc].[Latitude], 
                [Loc].[Longitude], 
                [Loc].[DateCreated], 
                [Loc].[DateModified], 
                [Loc].[CreatedBy], 
                [Loc].[ModifiedBy] 
            FROM [dbo].[Locations] AS [Loc] 
            WHERE [Loc].[Id] = [L].[LocationId] 
            FOR JSON AUTO
        ) AS [Location],
        [L].[Logo], 
        [L].[Website], 
        [L].[StatusId], 
        [L].[DateCreated], 
        [L].[DateModified], 
        [L].[CreatedBy], 
        [L].[ModifiedBy]
    FROM [dbo].[Lenders] AS [L] 
	INNER JOIN [dbo].[LenderTypes] as [LT]
		ON [L].LenderTypeId = [LT].Id
	INNER JOIN [dbo].[LoanTypes] AS [LoT] 
		ON [LoT].[Id] = [L].[LoanTypeId]
	INNER JOIN [dbo].[StatusTypes] AS [ST] 
		ON [ST].[Id] = [L].[StatusId]
	INNER JOIN [dbo].[Locations] AS [Loc] 
		ON [Loc].[Id] = [L].[LocationId];

END
GO
