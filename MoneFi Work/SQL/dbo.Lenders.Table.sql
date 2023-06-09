USE [MoneFi]
GO
/****** Object:  Table [dbo].[Lenders]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lenders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[LenderTypeId] [int] NOT NULL,
	[LoanTypeId] [int] NOT NULL,
	[Logo] [nvarchar](255) NULL,
	[Website] [nvarchar](255) NULL,
	[LocationId] [int] NULL,
	[StatusId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK_Lenders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Lenders] ADD  CONSTRAINT [DF_Lenders_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Lenders] ADD  CONSTRAINT [DF_Lenders_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Lenders]  WITH CHECK ADD  CONSTRAINT [FK_Lenders_LenderTypes] FOREIGN KEY([LenderTypeId])
REFERENCES [dbo].[LenderTypes] ([Id])
GO
ALTER TABLE [dbo].[Lenders] CHECK CONSTRAINT [FK_Lenders_LenderTypes]
GO
ALTER TABLE [dbo].[Lenders]  WITH CHECK ADD  CONSTRAINT [FK_Lenders_LoanTypes] FOREIGN KEY([LoanTypeId])
REFERENCES [dbo].[LoanTypes] ([Id])
GO
ALTER TABLE [dbo].[Lenders] CHECK CONSTRAINT [FK_Lenders_LoanTypes]
GO
ALTER TABLE [dbo].[Lenders]  WITH CHECK ADD  CONSTRAINT [FK_Lenders_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[Lenders] CHECK CONSTRAINT [FK_Lenders_Locations]
GO
ALTER TABLE [dbo].[Lenders]  WITH CHECK ADD  CONSTRAINT [FK_Lenders_StatusTypes] FOREIGN KEY([StatusId])
REFERENCES [dbo].[StatusTypes] ([Id])
GO
ALTER TABLE [dbo].[Lenders] CHECK CONSTRAINT [FK_Lenders_StatusTypes]
GO
